from pathlib import Path
import sys
from loguru import logger as log


def log_config():
    gray = "fg 196,196,196"
    log.remove()
    log.add(
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
    log.add(
        log_path,
        rotation="10 MB",
        retention="10 days",
        compression="zip",
        level="DEBUG",
        encoding="utf-8",
    )
    return log
