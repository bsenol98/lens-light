import express from "express";
import * as photoController from "../controller/photoController.js";

const router = express.Router()

router.route("/").get(photoController.photosView)
router.route("/:id").get(photoController.getPhotosByIdView);

router.route("/api/kontrol").get(photoController.getAllPhotosKontrol)
router.route("/api/")
    .post(photoController.createPhoto)
    .get(photoController.getAllPhotos)

// router.route("/api/:id").get(photoController.getAllPhotos)

export default router