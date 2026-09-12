#!/bin/sh
set -e

# VITE_API_URL is baked into the JS bundle at build time and may contain the
# literal placeholder "{HOST}" (e.g. "{HOST}/api/v1"). At container start we
# substitute it with the runtime HOST env var, so the same built image can be
# reused across environments and can even use a relative API path (empty HOST
# -> "/api/v1", resolved against whatever domain serves the frontend).
find /app/dist -type f -name "*.js" -exec sed -i "s#{HOST}#${HOST:-}#g" {} +

exec "$@"
