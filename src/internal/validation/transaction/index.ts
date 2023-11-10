import { createData } from './validate-create-data'
import { findData } from './validate-find-data'
import { updateData } from './validate-update-data'
import { deleteData } from './validate-delete-data'

export const validateTransaction = {
  createData,
  findData,
  updateData,
  deleteData,
}
