class Logger {
   constructor(field, append) {
      this.str = "";
      this.field = field;
      this.append = append;
   }
   log(msg) {
      if (this.append) { this.str += msg; }
      else { this.str = msg; }
      document.getElementById(this.field).innerHTML = this.str;
   }
   clear() {
      this.str = "";
      document.getElementById(this.field).innerHTML = this.str;
   }
}
