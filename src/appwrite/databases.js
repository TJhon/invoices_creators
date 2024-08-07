import { databases, storage } from "./config";
import { ID } from "appwrite";

const uploadFile = async (file) => {
  const _id = ID.unique();

  const _idBucket = import.meta.env.VITE_AW_bucket_invoices;
  await storage.createFile(_idBucket, _id, file);
  const { href } = storage.getFileView(_idBucket, _id);
  return { href };
};

export const getFileURL = (fileId) => {
  return `https://cloud.appwrite.io/v1/storage/buckets/${
    import.meta.env.VITE_AW_bucket_invoices
  }/files/${fileId}/view?project=${import.meta.env.VITE_AW_project}&mode=admin`;
};

// Photos url
export const uploadFilesGetURL = async (files_form) => {
  const files = await Promise.all(
    Array.from(files_form).map((fl) => uploadFile(fl))
  );
  const hrefs = await files.map((file) => file.href);
  return hrefs;
};

const db = {};
const db_id = import.meta.env.VITE_AW_db;
const collections = [
  {
    dbId: db_id,
    id: import.meta.env.VITE_AW_invoices_list,
    name: "invoice_main",
  },
  {
    dbId: db_id,
    id: import.meta.env.VITE_AW_tbl_gen,
    name: "tacker",
  },
  {
    dbId: db_id,
    id: import.meta.env.VITE_AW_tbl_items,
    name: "tracker_items",
  },
  {
    dbId: db_id,
    id: import.meta.env.VITE_AW_users,
    name: "users",
  },
];

collections.forEach((col) => {
  db[col.name] = {
    create: (payload, permissions, id = ID.unique()) =>
      databases.createDocument(col.dbId, col.id, id, payload, permissions),
    update: (id, payload, permissions) =>
      databases.updateDocument(col.dbId, col.id, id, payload, permissions),
    delete: (id) => databases.deleteDocument(col.dbId, col.id, id),
    list: (queries = []) => databases.listDocuments(col.dbId, col.id, queries),
    get: (id) => databases.getDocument(col.dbId, col.id, id),
  };
});

export default db;
