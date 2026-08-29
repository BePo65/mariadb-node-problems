/**
 * Class as interface to database
 * author: Bernhard Pottler
 */

import fs from "node:fs";
import mariadb from "mariadb";

import config from "./config.js";

export default class Photos {
  /**
   * Creates an instance of Photos.
   */
  constructor() {
    const dbUserFile = config.db.userFile;
    const dbPasswordFile = config.db.passwordFile;
    
    // We mock fs.readFileSync for tests if the file doesn't exist, but since it's hardcoded to D:\Temp... let's just let it fail or fix the paths.
    // For now just fix config access
    const dbUser = fs.readFileSync(dbUserFile, "utf8").trim();
    const dbPassword = fs.readFileSync(dbPasswordFile, "utf8").trim();

    // create the connection pool for database
    this.pool = mariadb.createPool({
      host: config.db.host,
      port: config.db.port,
      user: dbUser,
      password: dbPassword,
      database: "tourenbuch",
      multipleStatements: true,
      dateStrings: true,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  /**
   * Get list of all photos
   * @returns {object[]} list of all photos
   */
  async getPhotosList() {
    const selectColumns = [
      "photos_id",
      "dateTaken",
      "description",
      "width",
      "height",
      "tours_id",
    ];
    let selectFieldsDefinition = selectColumns.join(", ");
    const pagingParams = {
      start: 0,
      numberOfRows: 20
    };
    const sql = `SELECT SQL_CALC_FOUND_ROWS ${selectFieldsDefinition}
       FROM photos
       ORDER BY tours_id,dateTaken
       LIMIT ?, ?;
       SELECT FOUND_ROWS() AS totalRows;`;

    const results = await this.pool.query(sql, [
      pagingParams.start,
      pagingParams.numberOfRows,
    ]);

    if (
      !Array.isArray(results) ||
      results.length !== 2 ||
      !Array.isArray(results[0])
    ) {
      throw new Error(
        "Error reading photo list",
        200,
        "WARN",
        "Photos.getPhotosList",
      );
    }

    return results[0];
  }

  /**
   * Get data of photo with given ID.
   * @param {number} photoId - ID of photo to select
   * @returns {object} data of requested photo
   */
  async getPhotoById(photoId) {
    const sql = "SELECT photos_id, dateTaken, relativePath, description, width, height, versionStamp FROM photos WHERE photos_id=?;"
    const results = await this.pool.query(sql, [photoId]);
    if (!Array.isArray(results) || results.length !== 1) {
      throw new Error(
        `Photo with ID=${photoId} not found`,
        201,
        "WARN",
        "Photos.getPhotoById",
      );
    }
  }

  /**
   * Reset database to its original state using DELETE and INSERT
   */
  async resetDatabase() {
    const fieldList =
      "photos_id, dateTaken, relativePath, description, width, height, gps, tours_id, versionStamp";

    await using connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query(`DELETE FROM photos;`);
      await connection.query(
        `INSERT INTO photos (${fieldList}) SELECT ${fieldList} FROM photosOriginalData;`,
      );
      await connection.commit();
    } catch (err) {
      // Handle errors
      if (connection) {
        await connection.rollback();
      }
      console.error(
        `Error in resetDatabase - cause: "${err}"`,
      );
      throw new Error(
        `Error in resetDatabase - cause: "${err}`,
        202,
        "ERROR",
        "Photos.resetDatabase",
      );
    }
  }
}
