import React, { useState } from 'react';
import ImageUploading, { ImageListType } from "react-images-uploading";
import {BoxDragAndDrop} from './BoxDragAndDrop';
import {ImageSelected} from './ImageSelected';

export const DragAndDrop = () => {
    const [images, setImages] = useState<ImageListType>([]);
    const [urlImage, setUrlImage] = useState('')
    const [loading, setLoading] = useState(false);

    const handleChange = (imageList: ImageListType) => setImages(imageList);

    const onUpload = () => {}

    return (
        <>
            <ImageUploading multiple={false} value={images} onChange={handleChange} maxNumber={1}>
                {({
                      imageList,
                      onImageUpload,
                      dragProps,
                      isDragging,
                      onImageRemove,
                      onImageUpdate,
                  }) => (
                    <>
                        {
                            imageList[0]
                                ?  <ImageSelected  />
                                : <BoxDragAndDrop {...{ onImageUpload, dragProps, isDragging }} />
                        }
                    </>
                )}
            </ImageUploading>
        </>
    )
}
