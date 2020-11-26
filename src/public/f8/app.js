document.addEventListener('DOMContentLoaded', function () {
    // Mong muốn của chúng ta
    Validator({
    form: '#frmSign',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#fullname', 'Vui lòng nhập tên đầy đủ của bạn'),
        Validator.isEmail('#username'),
        Validator.minLength('#password', 6),
        Validator.isRequired('#password_confirmation'),
        Validator.isConfirmed('#password_confirmation', function () {
        return document.querySelector('#frmSign #password').value;
        }, 'Mật khẩu nhập lại không chính xác')
    ],
    // onSubmit: function (data) {
    //     // Call API
    //     console.log(data);
        
    // }
    });


    Validator({
    form: '#form-2',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
        Validator.isEmail('#username'),
        Validator.minLength('#password', 6),
    ],
    
    // onSubmit: function (data) {
    //     // Call API
    //     console.log(data);             
    //     //document.getElementById("form-2").submit();
    //  }
    });
});