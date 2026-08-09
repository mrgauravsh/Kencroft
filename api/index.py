import sys
import os
from pathlib import Path

# Add backend subfolder to sys.path
sys.path.append(str(Path(__file__).parent.parent / "backend"))

from server import app
