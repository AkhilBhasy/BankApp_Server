user= {
    1000: { acno: 1000, uname: "Akhil", password: "userone", balance: 5000,transaction:[] },
    1001: { acno: 1001, uname: "Shinu", password: "usertwo", balance: 3000,transaction:[]},
    1002: { acno: 1002, uname: "Hiran", password: "userthree", balance: 2000,transaction:[] },
    1003: { acno: 1003, uname: "Sayooj", password: "userfour", balance: 3000,transaction:[] },
    1004: { acno: 1004, uname: "Binu", password: "userfive", balance: 1000,transaction:[] }
  }


  const register=(acno,uname,password)=> {
   

    if (acno in user) {
      return {
        statusCode:422,
          status:false,
          message:"User already exists..."
      }
    }
    else {
      user[acno] = {
        acno,
        uname,
        password,
        balance: 0,
        transaction:[]
      }
      
      return {
        statusCode:200,
          status:true,
          message:"Registered Successfully....!!!"
      }


    }
  }

  const login=(acno, pswd)=> {
    
    if (acno in user) {
      if (pswd == user[acno]["password"]) {
        currentUser = user[acno]["uname"]
        currentAcc=acno
        
        return {
             statusCode:200,
            status:true,
            message:"Login Successfull...!!!"
        }
      }
      else {
        return {
            statusCode:422,
          status:false,
          message:"Incorrect Password"  
        }
      }
    }
    else {
     
      return {
        statusCode:422,
          status:false,
          message:"Invalid User"
      }
    }
  }


 const deposit=(acno, pswd, amt)=> {
    var amount = parseInt(amt)
    
    if (acno in user) {
      if (pswd == user[acno]["password"]) {
        user[acno]["balance"] += amount

        user[acno].transaction.push({
          amount:amount,
          type:"Credit"
        })
        
        return {
            statusCode:200,
            status:true,
            message:amount+" credited successfully.. Balance: "+ user[acno]["balance"]
        }
      }
      else {
        return {
            statusCode:422,
              status:false,
              message:"Invalid password"
          }
      }
    }
    else {
        return {
            statusCode:422,
              status:false,
              message:"Invalid User"
          }
    }

  }

 const withdraw=(acno, pswd, amt) =>{
    var amount = parseInt(amt)
   
    if (acno in user) {
      if (pswd == user[acno]["password"]) {
        if (user[acno]["balance"] > amount) {


          user[acno]["balance"] -= amount
          user[acno].transaction.push({
            amount:amount,
            type:"Debit"
          })
         
          return {
            statusCode:200,
            status:true,
            message:amount+" Debited successfully.. Balance: "+ user[acno]["balance"]
          }
        }
        else {
          return  {
                statusCode:422,
                  status:false,
                  message:"Insufficient Balance"
              }
        }
      }
      else {
        return  {
            statusCode:422,
              status:false,
              message:"Invalid password"
          }
      }
    }
    else {
        return {
            statusCode:422,
              status:false,
              message:"Invalid User"
          }
    }

  }

  module.exports={
      register,
      login,
      deposit,
      withdraw
  }