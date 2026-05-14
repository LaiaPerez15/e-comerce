# ============================
#  MAKEFILE — SNEAKERS STORE
#  Frontend (Angular 21)
#  Backend (Node + Express)
# ============================

# --- PATHS ---
FRONTEND=frontend
BACKEND=backend

# --- PHONY TARGETS ---
.PHONY: frontend backend dev install clean stop

# --- FRONTEND (Angular 21) ---
frontend:
	cd $(FRONTEND) && ng serve --open

# --- BACKEND (Node/Express) ---
backend:
	cd $(BACKEND) && npm run dev

# --- RUN BOTH IN PARALLEL ---
dev:
	make -j2 frontend backend

# --- INSTALL DEPENDENCIES ---
install:
	cd $(FRONTEND) && npm install
	cd $(BACKEND) && npm install

# --- CLEAN NODE_MODULES ---
clean:
	rm -rf $(FRONTEND)/node_modules
	rm -rf $(BACKEND)/node_modules

# --- STOP NODE PROCESSES ---
stop:
	killall node || true
