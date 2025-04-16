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
    return log
