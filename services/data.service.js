const db = require('./db')

user = {
  1000: { acno: 1000, uname: "Akhil", password: "userone", balance: 5000, transaction: [] },
  1001: { acno: 1001, uname: "Shinu", password: "usertwo", balance: 3000, transaction: [] },
  1002: { acno: 1002, uname: "Hiran", password: "userthree", balance: 2000, transaction: [] },
  1003: { acno: 1003, uname: "Sayooj", password: "userfour", balance: 3000, transaction: [] },
  1004: { acno: 1004, uname: "Binu", password: "userfive", balance: 1000, transaction: [] }
}


const register = (acno, uname, password) => {
  return db.User.findOne({
    acno
  }).then(user => {
    console.log(user)
    if (user) {
      return {
        statusCode: 422,
        status: false,
        message: "User already exists... plz log in"
      }
    }
    else {
      const newUser = new db.User({
        acno,
        uname,
        password,
        balance: 0,
        transaction: []
      })
      newUser.save()
      return {
        statusCode: 200,
        status: true,
        message: "Registered Successfully....!!!"
      }
    }
  })

  // if (acno in user) {
  //   return {
  //     statusCode:422,
  //       status:false,
  //       message:"User already exists..."
  //   }
  // }
  // else {
  //   user[acno] = {
  //     acno,
  //     uname,
  //     password,
  //     balance: 0,
  //     transaction:[]
  //   }

  //   return {
  //     statusCode:200,
  //       status:true,
  //       message:"Registered Successfully....!!!"
  //   }


  // }
}

const login = (req, acno, pswd) => {

  return db.User.findOne({
    acno,
    password: pswd
  }).then(user => {
    if (user) {
      req.session.currentAcc = user.acno
      return {
        statusCode: 200,
        status: true,
        message: "Login Successfull...!!!",
        userName:user.uname,
        currentAcc:user.acno
      }
    }
    return {
      statusCode: 422,
      status: false,
      message: "Invalid User"
    }
  })
}


const deposit = (req,acno, pswd, amt) => {
  var amount = parseInt(amt)

  return db.User.findOne({
    acno,
    password: pswd
  }).then(user => {
    if (!user) {
      return {
        statusCode: 422,
        status: false,
        message: "Invalid User"
      }
    }
    if(req.session.currentAcc!=user.acno){
      return {
        statusCode: 422,
        status: false,
        message: "Operation denied.. plz log in..."
      }
    }
    user.balance += amount
    user.transaction.push({
      amount: amount,
      type: "Credit"
    })
    user.save()
    return {
      statusCode: 200,
      status: true,
      message: amount + " credited successfully.. Balance: " + user.balance
    }
  })
}
//   if (acno in user) {
//     if (pswd == user[acno]["password"]) {
//       user[acno]["balance"] += amount

//       user[acno].transaction.push({
//         amount: amount,
//         type: "Credit"
//       })

//       return {
//         statusCode: 200,
//         status: true,
//         message: amount + " credited successfully.. Balance: " + user[acno]["balance"]
//       }
//     }
//     else {
//       return {
//         statusCode: 422,
//         status: false,
//         message: "Invalid password"
//       }
//     }
//   }
//   else {
//     return {
//       statusCode: 422,
//       status: false,
//       message: "Invalid User"
//     }
//   }

// }

const withdraw = (req,acno, pswd, amt) => {
  var amount = parseInt(amt)

  return db.User.findOne({
    acno,
    password: pswd
  }).then(user => {
    if (!user) {
      return {
        statusCode: 422,
        status: false,
        message: "Invalid User"
      }
    }
    if(req.session.currentAcc!=user.acno){
      return {
        statusCode: 422,
        status: false,
        message: "Operation denied.. plz log in..."
      }
    }
    if (user.balance > amount) {
      user.balance -= amount
      user.transaction.push({
        amount: amount,
        type: "Debit"
      })
      user.save()
      return {
        statusCode: 200,
        status: true,
        message: amount + " Debited successfully.. Balance: " + user.balance
      }
    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "Insufficient Balance"
      }
    }
  })
}
// if (acno in user) {
//   if (pswd == user[acno]["password"]) {
//     if (user[acno]["balance"] > amount) {


//       user[acno]["balance"] -= amount
//       user[acno].transaction.push({
//         amount: amount,
//         type: "Debit"
//       })

//       return {
//         statusCode: 200,
//         status: true,
//         message: amount + " Debited successfully.. Balance: " + user[acno]["balance"]
//       }
//     }
//     else {
//       return {
//         statusCode: 422,
//         status: false,
//         message: "Insufficient Balance"
//       }
//     }
//   }
//   else {
//     return {
//       statusCode: 422,
//       status: false,
//       message: "Invalid password"
//     }
//   }
// }
// else {
//   return {
//     statusCode: 422,
//     status: false,
//     message: "Invalid User"
//   }
// }



const getTransaction = (acno) => {
  return db.User.findOne({
    acno
  }).then(user => {
    if (user) {
      return {
        statusCode: 200,
        status: true,
        transaction: user.transaction
      }
    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "Invalid Operation"
      }
    }
  })
}


const deleteAcc = (acno) => {
  return db.User.deleteOne({
    acno:acno
  }).then(user => {
    if (user) {
      return {
        statusCode: 200,
        status: true,
        message:"Account "+ acno +" Successfully deleted..!!!"
      }
    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "Invalid Operation"
      }
    }
  })
}


module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction,
  deleteAcc
}