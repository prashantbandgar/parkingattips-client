import { format, parse } from "date-fns"

const formatDate=(date)=>{
    return format(parse(date,'yyyy-MM-dd',new Date()),'dd-MMM-yyyy')
}

const findslot = (id) => {
    switch (id) {
      case 1:
        return '00:00AM to 11:59PM'
      // case 2:
      //   return '12:00PM to 03:00PM'
      // case 3:
      //   return '03:00PM to 06:00PM'
      // case 4:
      //   return '06:00PM to 09:00PM'
      // case 5:
      //   return '09:00PM to 12:00PM'
    }
  }

export { formatDate ,findslot };