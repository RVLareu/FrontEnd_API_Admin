import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import Logo from '../components/Logo';
import {DragAndDrop} from './DragAndDrop';
import {FileUpload} from '../utils/FileUpload';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const FILELOADER_URL = '/loadFiles';

const cloud_name = 'example-cloud-name';
const preset = 'example-preset';
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`

export const FileLoader = () => {

    return (<section style={{ backgroundColor: 'grey' }}>
        <Logo />

    </section>)
}
