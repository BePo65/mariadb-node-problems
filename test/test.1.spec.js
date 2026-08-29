import test from 'node:test';
import assert from 'node:assert/strict';
import Photos from '../src/controller.js';

test('get list of photos from controller', async (t) => {
    const photosController = new Photos();
    // HACK try {
    const photosList = await photosController.getPhotosList();

    assert.ok(Array.isArray(photosList), 'Photos list should be an array');
    assert.equal(photosList.length, 20, 'Photos list should contain 20 entries');
    assert.deepEqual(photosList[1], {
        photos_id: 5443,
        dateTaken: "2018-04-09 13:28:15",
        description: "Heigelkopf, Blomberg, Zwiesel - Blombergkreuz",
        width: 4608,
        height: 3456,
        tours_id: 747
    });
    // HACK } finally {
    // HACK     await photosController.pool.end();
    // HACK }
});
