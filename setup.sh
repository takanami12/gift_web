#!/usr/bin/env bash
# ============================================================
#  Gift Web - Cross-Platform Environment Setup
#  Auto-detect OS (Ubuntu/macOS/WSL) and install dependencies.
# ============================================================

set -euo pipefail

# ── Colors ──────────────────────────────────────────────────
RED='\033[0;91m'
GREEN='\033[0;92m'
YELLOW='\033[0;93m'
BLUE='\033[0;94m'
MAGENTA='\033[0;95m'
CYAN='\033[0;96m'
WHITE='\033[0;97m'
GRAY='\033[0;90m'
BOLD='\033[1m'
DIM='\033[2m'
R='\033[0m'

# ── Required Node version ───────────────────────────────────
REQUIRED_NODE_MAJOR=20

# ── Helper functions ────────────────────────────────────────
step_ok()   { echo -e "  ${GREEN} ✓ ${R}  ${WHITE}$*${R}"; }
step_info() { echo -e "  ${BLUE} ↓ ${R}  ${GRAY}$*${R}"; }
step_warn() { echo -e "  ${YELLOW} ⚠ ${R}  ${YELLOW}$*${R}"; }
step_err()  { echo -e "  ${RED} ✗ ${R}  ${RED}${BOLD}$*${R}"; }
step_run()  { echo -e "  ${BLUE} ⟳ ${R}  ${GRAY}$*${R}"; }

section() {
  echo ""
  echo -e "  ${CYAN}${BOLD}┌──────────────────────────────────────────────┐${R}"
  echo -e "  ${CYAN}${BOLD}│${R}  ${WHITE}${BOLD} $1 ${R}  ${CYAN}$2${R}"
  echo -e "  ${CYAN}${BOLD}└──────────────────────────────────────────────┘${R}"
}

# ── Banner ──────────────────────────────────────────────────
clear 2>/dev/null || true
echo ""
echo -e "  ${CYAN}${BOLD}┌─────────────────────────────────────────────────┐${R}"
echo -e "  ${CYAN}${BOLD}│${R}                                                 ${CYAN}${BOLD}│${R}"
echo -e "  ${CYAN}${BOLD}│${R}   ${MAGENTA}${BOLD}  ___  _  __ _    ${CYAN}__    __    _       ${CYAN}${BOLD}│${R}"
echo -e "  ${CYAN}${BOLD}│${R}   ${MAGENTA}${BOLD} / __\\(_)/ _| |_  ${CYAN}/ / /\\ \\ \\__| |__   ${CYAN}${BOLD}│${R}"
echo -e "  ${CYAN}${BOLD}│${R}   ${MAGENTA}${BOLD}/ / _\\| | |_| __| ${CYAN}\\ \\/  \\/ / _ \\ '_ \\  ${CYAN}${BOLD}│${R}"
echo -e "  ${CYAN}${BOLD}│${R}   ${MAGENTA}${BOLD}/ /_\\\\ | |  _| |_  ${CYAN} \\  /\\  /  __/ |_) ${CYAN}${BOLD}│${R}"
echo -e "  ${CYAN}${BOLD}│${R}   ${MAGENTA}${BOLD}\\____/|_|_|  \\__| ${CYAN}  \\/  \\/ \\___|_.__/ ${CYAN}${BOLD}│${R}"
echo -e "  ${CYAN}${BOLD}│${R}                                                 ${CYAN}${BOLD}│${R}"
echo -e "  ${CYAN}${BOLD}│${R}    ${WHITE}${BOLD}Environment Setup Script v1.0${R}   ${GRAY}Linux/macOS${R}  ${CYAN}${BOLD}│${R}"
echo -e "  ${CYAN}${BOLD}└─────────────────────────────────────────────────┘${R}"
echo ""

# ── Detect OS ───────────────────────────────────────────────
detect_os() {
  case "$(uname -s)" in
    Linux*)
      if grep -qi ubuntu /etc/os-release 2>/dev/null; then
        OS="Ubuntu"
      elif grep -qi debian /etc/os-release 2>/dev/null; then
        OS="Debian"
      elif grep -qi "microsoft" /proc/version 2>/dev/null; then
        OS="WSL"
      else
        OS="Linux"
      fi
      ;;
    Darwin*)
      OS="macOS"
      ;;
    *)
      OS="Unknown"
      ;;
  esac
  echo -e "  ${GREEN} ✓ ${R}  ${WHITE}OS detected: ${GREEN}${BOLD}${OS}${R}"
}

# ── Install system packages (Ubuntu/Debian) ─────────────────
install_system_deps_ubuntu() {
  step_info "Updating apt package list..."
  sudo apt-get update -y -qq

  step_info "Installing system packages..."
  sudo apt-get install -y -qq \
    curl wget git build-essential ca-certificates \
    gnupg lsb-release unzip > /dev/null
  step_ok "System packages installed"
}

# ── Install system packages (macOS) ─────────────────────────
install_system_deps_macos() {
  if ! command -v brew &>/dev/null; then
    step_info "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  fi
  step_info "Installing system packages..."
  brew install git curl wget -q
  step_ok "System packages installed"
}

# ── Install Node.js via nvm ─────────────────────────────────
install_nvm() {
  export NVM_DIR="${HOME}/.nvm"

  if [ -s "$NVM_DIR/nvm.sh" ]; then
    # shellcheck source=/dev/null
    source "$NVM_DIR/nvm.sh"
    step_ok "nvm already installed"
  else
    step_info "Installing nvm (Node Version Manager)..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash 2>/dev/null

    export NVM_DIR="${HOME}/.nvm"
    # shellcheck source=/dev/null
    source "$NVM_DIR/nvm.sh"
    step_ok "nvm installed"
  fi
}

install_node() {
  install_nvm

  if command -v node &>/dev/null; then
    CURRENT_MAJOR=$(node -v | sed 's/v//' | cut -d. -f1)
    if [ "$CURRENT_MAJOR" -ge "$REQUIRED_NODE_MAJOR" ]; then
      step_ok "Node.js $(node -v) ${GRAY}- already installed"
      return
    fi
  fi

  step_info "Installing Node.js v${REQUIRED_NODE_MAJOR} LTS..."
  nvm install "$REQUIRED_NODE_MAJOR" > /dev/null 2>&1
  nvm use "$REQUIRED_NODE_MAJOR" > /dev/null 2>&1
  nvm alias default "$REQUIRED_NODE_MAJOR" > /dev/null 2>&1
  step_ok "Node.js $(node -v) installed"
}

# ── Verify npm ──────────────────────────────────────────────
verify_npm() {
  if ! command -v npm &>/dev/null; then
    step_err "npm not found! Check Node.js installation."
    exit 1
  fi
  step_ok "npm $(npm -v) ${GRAY}- ready"
}

# ── Install project dependencies ────────────────────────────
install_project_deps() {
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

  if [ ! -f "$SCRIPT_DIR/package.json" ]; then
    step_err "package.json not found at $SCRIPT_DIR"
    exit 1
  fi

  step_info "Running npm install..."
  echo ""
  cd "$SCRIPT_DIR"
  npm install
  echo ""
  step_ok "All dependencies installed"
}

# ── Summary ─────────────────────────────────────────────────
print_summary() {
  local NODE_V=$(node -v)
  local NPM_V=$(npm -v)

  echo ""
  echo -e "  ${GREEN}${BOLD}┌──────────────────────────────────────────────┐${R}"
  echo -e "  ${GREEN}${BOLD}│${R}                                              ${GREEN}${BOLD}│${R}"
  echo -e "  ${GREEN}${BOLD}│${R}    ${WHITE}${BOLD}Setup hoan tat thanh cong!${R}              ${GREEN}${BOLD}│${R}"
  echo -e "  ${GREEN}${BOLD}│${R}                                              ${GREEN}${BOLD}│${R}"
  echo -e "  ${GREEN}${BOLD}│${R}    ${GRAY}Node.js  ${R}${WHITE}${BOLD}${NODE_V}${R}                        ${GREEN}${BOLD}│${R}"
  echo -e "  ${GREEN}${BOLD}│${R}    ${GRAY}npm      ${R}${WHITE}${BOLD}${NPM_V}${R}                          ${GREEN}${BOLD}│${R}"
  echo -e "  ${GREEN}${BOLD}│${R}    ${GRAY}OS       ${R}${WHITE}${BOLD}${OS}${R}                        ${GREEN}${BOLD}│${R}"
  echo -e "  ${GREEN}${BOLD}│${R}                                              ${GREEN}${BOLD}│${R}"
  echo -e "  ${GREEN}${BOLD}└──────────────────────────────────────────────┘${R}"
  echo ""
  echo -e "  ${CYAN}${BOLD} Commands ${R}"
  echo ""
  echo -e "  ${WHITE}  npm run dev  ${R}    ${GRAY}─  Development server${R}"
  echo -e "  ${WHITE}  npm run build${R}    ${GRAY}─  Build production${R}"
  echo -e "  ${WHITE}  npm run start${R}    ${GRAY}─  Production server${R}"
  echo -e "  ${WHITE}  npm run lint ${R}    ${GRAY}─  Lint check${R}"
  echo ""
  echo -e "  ${GRAY}──────────────────────────────────────────────${R}"
  echo ""
}

# ── Main ────────────────────────────────────────────────────
main() {
  detect_os

  section "STEP 1" "System Packages"
  echo ""
  case "$OS" in
    Ubuntu|Debian|WSL|Linux)
      install_system_deps_ubuntu
      ;;
    macOS)
      install_system_deps_macos
      ;;
    *)
      step_warn "Unknown OS. Skipping system packages."
      ;;
  esac

  section "STEP 2" "Node.js"
  echo ""
  install_node

  section "STEP 3" "npm"
  echo ""
  verify_npm

  section "STEP 4" "Project Dependencies"
  echo ""
  install_project_deps

  print_summary
}

main "$@"
