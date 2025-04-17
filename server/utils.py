from pathlib import Path
import sys
from loguru import logger
import logging


class InterceptHandler(logging.Handler):
    def emit(self, record):
        # Przekieruj poziomy logowania
        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        # Przekieruj log z oryginalnym miejscem pochodzenia (jeśli możliwe)
        frame, depth = logging.currentframe(), 2
        while frame and frame.f_code.co_filename == logging.__file__:
            frame = frame.f_back
            depth += 1

        logger.opt(depth=depth, exception=record.exc_info).log(
            level, record.getMessage()
        )


def log_config():
    gray = "fg 196,196,196"
    logger.remove()
    logger.add(
        sys.stderr,
        format="<"
        + gray
        + ">{time:YYYY-MM-DD HH:mm:ss}</"
        + gray
        + "> | <level>{level: <8}</level> | <cyan>{file}</cyan>:<yellow>{line}</yellow> | {message}",
        level="DEBUG",
        colorize=True,
    )
    log_dir = Path.cwd() / "logs"
    log_dir.mkdir(exist_ok=True)
    log_path = log_dir / "app.log"
    logger.add(
        log_path,
        rotation="10 MB",
        retention="10 days",
        compression="zip",
        level="DEBUG",
        encoding="utf-8",
    )

    logging.basicConfig(handlers=[InterceptHandler()], level=0, force=True)
    for name in ("uvicorn", "uvicorn.error", "uvicorn.access", "fastapi"):
        logging.getLogger(name).handlers = [InterceptHandler()]

    return logger
