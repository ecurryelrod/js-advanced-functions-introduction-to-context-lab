// Your code here

// let employeeRecords = [
//     ["Thor", "Odinsson", "Electrical Engineer", 45],
//     ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
//     ["Natalia", "Romanov", "CEO", 150]
// ];

const createEmployeeRecord = (employeeInfo) => {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo [3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

const createEmployeeRecords = (arrayOfEmployees) => {
    return arrayOfEmployees.map(employeeInfo => {
        return createEmployeeRecord(employeeInfo);
    });
};

// let allEmployees = createEmployeeRecords(employeeRecords);

const createTimeInEvent = (employeeRecord, dateStamp) => {
    let dateTimeArray = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateTimeArray[1], 10),
        date: dateTimeArray[0]
    });
    return employeeRecord;
};

const createTimeOutEvent = (employeeRecord, dateStamp) => {
    let dateTimeArray = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateTimeArray[1]),
        date: dateTimeArray[0]
    });
    return employeeRecord;
};

// createTimeInEvent(allEmployees[0], '2022-01-18 1300')
// createTimeOutEvent(allEmployees[0], '2022-01-18 1700')
// createTimeInEvent(allEmployees[1], '2022-01-19 1200')
// createTimeOutEvent(allEmployees[1], '2022-01-19 1700')
// createTimeInEvent(allEmployees[2], '2022-01-20 1100')
// createTimeOutEvent(allEmployees[2], '2022-01-20 1700')

const hoursWorkedOnDate = (employeeRecord, date) => {
    let dateIn = employeeRecord.timeInEvents.find((event) => {
        return event.date === date;
    });
    let dateOut = employeeRecord.timeOutEvents.find((event) => {
        return event.date === date;
    });
    return (dateOut.hour - dateIn.hour) / 100
};

const wagesEarnedOnDate = (employeeRecord, date) => {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
};

const allWagesFor = (employeeRecord) => {
    let datesWorked = employeeRecord.timeInEvents.map(event => {
        return event.date;
    });
    let amountToPay = datesWorked.reduce((previousValue, date) => {
        return previousValue + wagesEarnedOnDate(employeeRecord, date)
    }, 0);
    return amountToPay
};

const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(record => {
        return record.firstName === firstName
    });
};

const calculatePayroll = (arrayOfEmployees) => {
    return arrayOfEmployees.reduce((previousValue, employeeRecord) => {
        return previousValue + allWagesFor(employeeRecord)
    }, 0)
};