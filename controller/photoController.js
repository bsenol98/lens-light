import Photo from "../models/photoModel.js";

const photosView = async (req, res) => {
    const photosResult = await getAllPhotos();
    res.status(200).render("photos", { photosResult })
}
const getPhotosByIdView = async (req, res) => {
    const photo = await Photo.findById({ _id: req.params.id });
    res.status(200).render("photoDetails", { photo });
}



const createPhoto = async (req, res) => {
    try {
        const photo = await Photo.create(req.body);
        res.status(201).json({
            valid: true,
            err: [],
            data: photo
        })
    } catch (error) {
        res.status(500).json({
            valid: false,
            err: error,
            data: req.body
        })
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

export { createPhoto, getAllPhotos, photosView, getPhotosByIdView, getAllPhotosKontrol }