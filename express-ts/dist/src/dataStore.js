"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const fetchUsers_1 = require("../api/fetchUsers");
exports.data = (0, fetchUsers_1.fetchUsers)().data;
