/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/14/2020
 * Time: 11:36 AM
 */
import { Factory } from '@tngraphql/illuminate/dist/Support/Facades';
import { ProductMasterKindEnumType } from '../../app/Features/Product/Types/Product/ProductMasterKindEnumType';

Factory.blueprint('App/Features/Media/MediaModel', (faker, index, data) => {
    return {
        status: 1,
        title: 'Man dance copy-2',
        guid: '//127.0.0.1:8008/images/6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy.jpg',
        src: '/images/6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy.jpg',
        srcMd5: 'da90c32ed75c3f82a25e75940508d461',
        rootId: '0',
        filesize: 498945,
        mineType: 'image/jpeg',
        data: '{"width":1368,"height":1600,"file":"/images/6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy.jpg","sizes":{"thumbnail":{"file":"6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy-280x280.jpg","guid":"//127.0.0.1:8008/images/6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy-280x280.jpg","size":313600,"mime-type":"image/jpeg","width":280,"height":280},"shopThumbnail":{"file":"6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy-100x100.jpg","guid":"//127.0.0.1:8008/images/6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy-100x100.jpg","size":40000,"mime-type":"image/jpeg","width":100,"height":100},"medium":{"file":"6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy-342x400.jpg","guid":"//127.0.0.1:8008/images/6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy-342x400.jpg","size":547200,"width":342,"height":400,"mime-type":"image/jpeg"},"mediumLarge":{"file":"6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy-768x898.jpg","guid":"//127.0.0.1:8008/images/6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy-768x898.jpg","size":2758656,"width":768,"height":898,"mime-type":"image/jpeg"},"large":{"file":"6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy-684x800.jpg","guid":"//127.0.0.1:8008/images/6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy-684x800.jpg","size":2188800,"width":684,"height":800,"mime-type":"image/jpeg"},"shopCatalog":{"file":"6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy-300x351.jpg","guid":"//127.0.0.1:8008/images/6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy-300x351.jpg","size":421200,"width":300,"height":351,"mime-type":"image/jpeg"},"shopSingle":{"file":"6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy-600x702.jpg","guid":"//127.0.0.1:8008/images/6ebf23f6-41f1-4a8f-890e-619d6a6f6b15-Man%20dance%20copy-600x702.jpg","size":1684800,"width":600,"height":702,"mime-type":"image/jpeg"}}}',
        folderName: ''
    }
});