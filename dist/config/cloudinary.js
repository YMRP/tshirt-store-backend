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
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        // Configuration
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
        });
        // Upload an image
        const uploadResult = yield cloudinary_1.v2.uploader
            .upload('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
            public_id: 'shoes',
        })
            .catch((error) => {
            console.log(error);
        });
        console.log(uploadResult);
        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary_1.v2.url('shoes', {
            fetch_format: 'auto',
            quality: 'auto'
        });
        console.log(optimizeUrl);
        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary_1.v2.url('shoes', {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });
        console.log(autoCropUrl);
    });
})();
exports.default = cloudinary_1.v2;
