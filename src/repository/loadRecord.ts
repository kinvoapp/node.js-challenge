
import Record from '../models/recordModel'


const loadRecord = () => {
   return Record.find()
}

export default loadRecord