
import CommonPage from "./commonPage";
class PaymentPage extends CommonPage{
    constructor(){
        super();

    }
        /** Filling the details in the payment page */
    async fillPaymentDetails(name, email, address, phone) {
        await this.$details("fullName").setValue(name);
        await this.$details("email").setValue(email);
        await this.$detailsAddress().setValue(address);
        await this.$details("phone").setValue(phone);
        await this.$button("Place Order").click();

    }

}
export default new PaymentPage();