import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider, IManipulateDaysDTO } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }

  dateNowInUTC(): Dayjs {
    return dayjs().utc();
  }

  manipulateDays({ days, type }: IManipulateDaysDTO): Date {
    if (type === "add") {
      return dayjs().add(days, "days").toDate();
    }

    return dayjs().subtract(days, "days").toDate();
  }

  manipulateDaysInUTC({ days, type }: IManipulateDaysDTO): Dayjs {
    if (type === "add") {
      return dayjs().utc().add(days, "days");
    }

    return dayjs().utc().subtract(days, "days");
  }

  isDateUTC(date: Dayjs | Date): boolean {
    const isUtc = dayjs(date).isUTC();

    if (isUtc) {
      return true;
    }

    return false;
  }
}

export { DayjsDateProvider };
