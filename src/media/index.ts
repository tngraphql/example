/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/28/2020
 * Time: 9:13 PM
 */
const express = require('express');
const router = express.Router();

import {upload} from "./upload";
import {downloadMedia} from "./downloadMedia";

router.use(upload);
router.use(downloadMedia);

export const media = router;