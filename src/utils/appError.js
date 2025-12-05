// class AppError extends Error {

//     constructor(){
//         super();
//     }
//     static create(messge , statusCode , statusText){
//         this.message = mesage;
//         this.statusCode = statusCode;
//         this.statusText = statusText;
//         return this;
//     }
// }

// module.exports =  AppError()

class appError extends Error {
  constructor(message, statusCode, statusText) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = statusText;
  }

  static create(message, statusCode, statusText) {
    return new appError(message, statusCode, statusText);
  }
}

export default appError;
