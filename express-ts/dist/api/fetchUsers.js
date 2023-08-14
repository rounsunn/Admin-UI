"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUsers = void 0;
const axios_1 = __importDefault(require("axios"));
const baseURL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
const fetchUsers = () => {
    let data = [];
    const fetchU = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const resp = yield axios_1.default.get(baseURL);
            //   console.log(resp);
            data.push(...resp.data);
        }
        catch (error) {
            if (error instanceof Error) {
                data: error.message;
            }
            else {
                data: "Unknown error occured";
            }
        }
    });
    void fetchU();
    return { data };
};
exports.fetchUsers = fetchUsers;
