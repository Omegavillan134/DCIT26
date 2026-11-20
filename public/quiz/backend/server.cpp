#include <iostream>
#include <cstdlib>
#include <string>
#include "httplib.h" // Make sure this file is in your backend folder!
#include "json.hpp"  // Assuming you use this for JSON parsing

using namespace httplib;
using json = nlohmann::json;

int main() {
    Server svr;

    // 1. CORS Setup (MUST be before routes)
    svr.set_pre_routing_handler([](const Request& req, Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
        res.set_header("Access-Control-Allow-Methods", "POST, OPTIONS");
        if (req.method == "OPTIONS") {
            res.status = 204;
            return Server::HandlerResponse::Handled;
        }
        return Server::HandlerResponse::Unhandled;
    });

    // 2. Your Grading Route
    svr.Post("/api/grade", [](const Request& req, Response& res) {
        try {
            auto data = json::parse(req.body);
            auto answers = data["answers"];
            auto correctAnswers = data["correctAnswers"];
            
            int score = 0;
            for (size_t i = 0; i < answers.size(); ++i) {
                if (answers[i] == correctAnswers[i]) {
                    score++;
                }
            }
            
            int total = correctAnswers.size();
            std::string remark = (score == total) ? "Perfect!" : (score > total / 2) ? "Good job!" : "Keep studying!";
            std::string color = (score > total / 2) ? "green" : "red";

            json response = {
                {"score", score},
                {"total", total},
                {"remark", remark},
                {"color", color}
            };
            res.set_content(response.dump(), "application/json");
        } catch (const std::exception& e) {
            res.status = 400;
            res.set_content("{\"error\": \"Invalid JSON\"}", "application/json");
        }
    });

    // 3. Port & Host Binding (For Render)
    int port = 8080;
    if (const char* p = std::getenv("PORT")) {
        port = std::stoi(p);
    }

    std::cout << "Server starting on port " << port << std::endl;
    svr.listen("0.0.0.0", port);
    
    return 0;
}