import CommonPage from "./commonPage";


class WishListPage extends CommonPage{
    constructor(){
        super();

    }
    async addToWishList(){
        await this.$firstProduct().click();
    }
}
export default new WishListPage();