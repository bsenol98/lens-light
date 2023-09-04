import Photo from "../models/photoModel.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const photosView = async (req, res) => {
    const photosResult = await getAllPhotos();
    res.status(200).render("photos", { photosResult })
}
const getPhotosByIdView = async (req, res) => {
    const photo = await Photo.findById({ _id: req.params.id }).populate("user");
    res.status(200).render("photoDetails", { photo });
}
const getPhotosByUserId = async userId => await Photo.find({ user: userId });

const createPhotoView = async (req, res) => {
    const userId = res.locals.user._id;
    const result = await createPhoto({ ...req.body, "image": req.files.image, user: userId });
    if (result.valid) {
        // res.status(201).json(result);
        res.status(201).render("panel", {
            "photos": await getPhotosByUserId(userId)
        });
    } else {
        // res.status(500).json(result);
        res.status(500).render("panel");
    }
}

const createPhoto = async payload => {
    console.log("File upload");
    const photoUploderResult = await cloudinary.uploader.upload(
        payload.image.tempFilePath,
        {
            "use_filename": true,
            "folder": "lens-light"
        }
    );
    try {
        const photo = await Photo.create({
            "name": payload?.name,
            "description": payload?.description,
            "user": payload?.user,
            "url": photoUploderResult?.secure_url
        });
        fs.unlinkSync(payload.image.tempFilePath);
        return {
            valid: true,
            err: [],
            data: photo
        };

    } catch (error) {
        return {
            valid: false,
            err: error,
            data: payload
        };
    }
}

const getAllPhotos = async (req, res) => ({
    valid: true,
    err: [],
    data: await Photo.find({})
})

const getAllPhotosKontrol = async (req, res) => {
    const data = await Photo.find({});
    const length = data.length;
    res.status(200).json({
        valid: true,
        err: [],
        data,
        recordsTotal: length,
        recordsFiltered: length,
    });
}

export { createPhoto, getPhotosByUserId, getAllPhotos, createPhotoView, photosView, getPhotosByIdView, getAllPhotosKontrol }