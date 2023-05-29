import moment from "moment";
import _ from "lodash";

export const getNewID = () => {
  return Math.random().toString(36).substr(2, 16);
};

export const generatePassword = () => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
};

export const getInternationalAgeByBirthDate = (birthDate) => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  const monthDay = month + day;

  birthDate = birthDate.replace("-", "").replace("-", "");
  const birthdayy = birthDate.substr(0, 4);
  const birthdaymd = birthDate.substr(4, 4);

  const age = monthDay < birthdaymd ? year - birthdayy - 1 : year - birthdayy;
  return age;
};

export const getKoreaAgeByBirthDate = (birthDate) => {
  const date = new Date();
  const year = date.getFullYear();

  birthDate = birthDate.replace("-", "").replace("-", "");
  const birthdayy = birthDate.substr(0, 4);
  return year - birthdayy + 1;
};

export const toInternationalNumber = (phoneNumber = "") => {
  if (phoneNumber.startsWith("+82")) return phoneNumber;
  if (phoneNumber.startsWith("01")) phoneNumber = "+82" + phoneNumber.slice(1);
  return phoneNumber.replace(/ /g, "");
};

export const toLocalNumber = (phoneNumber) => {
  if (phoneNumber.startsWith("01")) return phoneNumber;
  if (phoneNumber.startsWith("+82")) phoneNumber = "0" + phoneNumber.slice(3);
  return phoneNumber;
};

/**
 * client 스타일에서 가공
 */
export const toTermsOfServices = (clientStyle) => {
  return clientStyle.reduce((obj, item) => {
    obj[item.id] = item.agreeYn;
    return obj;
  }, {});
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 9: 1800 ~ 1899년에 태어난 남성
// 0: 1800 ~ 1899년에 태어난 여성
// 1: 1900 ~ 1999년에 태어난 남성
// 2: 1900 ~ 1999년에 태어난 여성
// 3: 2000 ~ 2099년에 태어난 남성
// 4: 2000 ~ 2099년에 태어난 여성
// 5: 1900 ~ 1999년에 태어난 외국인 남성
// 6: 1900 ~ 1999년에 태어난 외국인 여성
// 7: 2000 ~ 2099년에 태어난 외국인 남성
// 8: 2000 ~ 2099년에 태어난 외국인 여성을
export const convertToBirthDateFromIdNumber = (frontIdNumber, backIdNumber) => {
  // 주민번호 첫쨰자리에서 년,월,일 값을 가져오기

  const code = parseInt(backIdNumber);
  let yearOfFront = "";
  let yearOfBack = frontIdNumber.substring(0, 2);
  let month = frontIdNumber.substring(2, 4);
  let date = frontIdNumber.substring(4, 6);
  if (code == 9 || code == 0) {
    yearOfFront = "18";
  } else if (code == 1 || code == 2) {
    yearOfFront = "19";
  } else if (code == 3 || code == 4) {
    yearOfFront = "20";
  } else if (code == 5 || code == 6) {
    yearOfFront = "19";
  } else if (code == 7 || code == 8) {
    yearOfFront = "20";
  }
  const year = yearOfFront + yearOfBack;
  return `${year}-${month}-${date}`;
};

export const genderString = (genderCode) => {
  const code = parseInt(genderCode);
  switch (code) {
    case 1:
      return "M";
    case 2:
      return "W";
    case 3:
      return "M";
    case 4:
      return "W";
    case 5:
      return "M";
    case 6:
      return "W";
    case 7:
      return "M";
    case 8:
      return "W";
    case 9:
      return "M";
    case 0:
      return "W";
  }
};

/**
 * 오늘 날짜 가까운순 소팅
 */
export const sortListByDate = (list) => {
  const today = moment();

  list.forEach((item) => {
    const itemDate = moment(item?.startDate);
    const timeDiff = Math.abs(itemDate.diff(today, "days"));
    item.timeDiff = timeDiff;
  });

  list.sort((a, b) => {
    if (a.timeDiff === b.timeDiff) {
      return moment(a.startDate) - moment(b.startDate);
    } else {
      return a.timeDiff - b.timeDiff;
    }
  });

  list.forEach((item) => {
    delete item.timeDiff;
  });

  return list;
};

/**
 * 두개 필드라는 가정
 * @param {*} fields ex: ["createdAt", "updatedAt"]
 * @param {*} order ex: ["asc", "desc"]
 * @returns
 */
export const fieldSorter = (fields, order) => (f, r) =>
  fields
    .map((o, idx) => {
      let dir = 1;
      if (o[0] === "-") {
        dir = -1;
        o = o.substring(1);
      }
      const a = f;
      const b = r;
      if (_.isArray(order)) {
        if (order[idx] === "desc") {
          dir = -1;
          // a = r;
          // b = f;
        }
      } else {
        if (order === "desc") {
          dir = -1;
          // a = r;
          // b = f;
        }
      }

      if (
        (_.isObject(a[o]) && (a[o]._seconds || a[o].seconds)) ||
        (typeof a[o] === "string" && o.includes("Date"))
      ) {
        if (typeof a[o] === "string") {
          return moment(a[o]) > moment(b[o])
            ? dir
            : moment(a[o]) < moment(b[o])
            ? -dir
            : 0;
        }

        if (a[o]._seconds) {
          return moment(a[o]._seconds * 1000) > moment(b[o]._seconds * 1000)
            ? dir
            : moment(a[o]._seconds * 1000) < moment(b[o]._seconds * 1000)
            ? -dir
            : 0;
        }

        if (a[o].seconds) {
          return moment(a[o]._seconds * 1000) > moment(b[o]._seconds * 1000)
            ? dir
            : moment(a[o]._seconds * 1000) < moment(b[o]._seconds * 1000)
            ? -dir
            : 0;
        }
      }

      return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
    })
    .reduce((p, n) => (p ? p : n), 0);
