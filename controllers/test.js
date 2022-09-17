data: [
    {
        "author": "6315f0fcff3c8d1ff50ed53a",
        "fileName": "donald-trump.jpg",
        "fileUri": "https://gs://keen-virtue-360209.appspot.com.storage.googleapis.com/1662603571405.jpg"
    }
]

console.log(data[1].author)

const fileUpload = storage.upload.array('file', 5);
fileUpload (req, res, (err) => {
    const files = req.files;
    
    
    // const upload = storage.upload.array('file', 5);
    if (err) {
        // console.log(err);
        return res.status(400).json({
            status: false,
            message: "Unable to upload file",
            error: utils.getMessage("FILE_UPLOAD_ERROR"),
        });
    }

    const uploadFile = async (req, res) => {
        const { _id } = req.user;
        try {
            let createdFiles = [];
            for (i = 0; i < files.length; i++) {            
                const newFile = await new Object({
                    author: _id,
                    fileName: files[i].originalname,
                    fileUri: files[i].path,
                    // fileSize: files[i].size 
                }).save();
                console.log('file info', files[i]);
    
                console.log(newFile);
                createdFiles.push(newFile);
            }
    
            if (createdFiles == null){
                return res.status(400).json({
                    status: false,
                    message: "Unable to upload file",
                    error: utils.getMessage("FILE_UPLOAD_ERROR"),
                });
            }
    
            return res.status(200).json({
                success: true,
                message: "file successfully uploaded",
                createdFiles
            });
        } catch (error) {
            console.log(error);
            // return res.status(500).json({
            //     status: false,
            //     message: "Unable to upload Files",
            //     error: utils.getMessage("UNKNOWN_ERROR"),
            // });
        }
    }

    
});