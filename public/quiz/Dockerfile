FROM debian:bookworm-slim AS build
RUN apt-get update && apt-get install -y g++ make && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Copy the backend folder into the container
COPY backend/ /app/backend/
WORKDIR /app/backend

# Compile the code
RUN g++ -O2 -std=c++17 -o grader server.cpp -pthread

FROM debian:bookworm-slim
WORKDIR /app
# Copy the compiled binary from the build stage
COPY --from=build /app/backend/grader /app/grader

ENV PORT=8080
EXPOSE 8080
CMD ["/app/grader"]