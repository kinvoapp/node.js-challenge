import { ValidOperators } from "../../../@types"
import { AppError } from "../../shared/errors/AppError"
import moment from "moment"

export type QueryParamsType = [string, ValidOperators, string | number | Date]

export class QueryParams {
  handle(queryString: string, validFields: string[]): QueryParamsType[] {
    if (!queryString) return []

    const search: QueryParamsType[] = []
    const fields = queryString.replace(/[()]/gi, "").split(";")

    fields.map((field) => {
      const matchOperator = field.match(/(>=)|(<=)|(!=)|(>)|(<)|(=)/g) as ValidOperators[] | null
      if (!matchOperator) throw new AppError("Operator was not found")
      if (matchOperator.length > 1) throw new AppError("You must provide only one operator")
      const [operator] = matchOperator
      if (!operator) throw new AppError("Invalid query param")
      const [key, value] = field.split(operator)
      if (!validFields.includes(key)) throw new AppError("Invalid query param provided, valid fields are: " + validFields.join(", "))

      this.isDate(value) ? search.push([key, operator, new Date(value)]) : search.push([key, operator, value])
    })

    return search
  }

  isDate(date: string) {
    return moment(date, "YYYY-MM-DD", true).isValid()
  }
}
