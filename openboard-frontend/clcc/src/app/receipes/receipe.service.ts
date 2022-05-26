import { Receipe } from "./receipe.model";

export class ReceipeService{
    private receipes:Receipe[]=[
        new Receipe('Sample Receipe','This is a sample receipe for test','https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=375,341'),
        new Receipe('Sample Receipe 2','This is a sample receipe 2 for test','https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg')
      ];

    getReceipes(){
        return this.receipes.slice();
    }

}