#pragma once
#include <unordered_map>
#include <string>

class FormData {
public:
    static std::unordered_map<std::string, std::string> parse(const std::string &body, const std::string &boundary) {
        std::unordered_map<std::string, std::string> formData;

        const std::string delimiter = "--" + boundary;
        size_t pos = 0;
        while ((pos = body.find(delimiter, pos)) != std::string::npos) {
            const size_t start = body.find("\r\n\r\n", pos);
            if (start == std::string::npos) break;

            const size_t end = body.find(delimiter, start);
            if (end == std::string::npos) break;

            std::string part = body.substr(pos, end - pos);

            size_t namePos = part.find("name=\"");
            if (namePos == std::string::npos) continue;
            namePos += 6;
            const size_t nameEnd = part.find('\"', namePos);
            std::string name = part.substr(namePos, nameEnd - namePos);

            size_t valueStart = part.find("\r\n\r\n", namePos);
            if (valueStart == std::string::npos) continue;
            valueStart += 4;
            std::string value = part.substr(valueStart);
            value.erase(value.find_last_not_of("\r\n") + 1);

            formData[name] = value;
            pos = end;
        }

        return formData;
    }
};
