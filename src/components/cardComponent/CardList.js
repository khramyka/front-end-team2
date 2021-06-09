import React from 'react';
import { Plaginator, ChooseFilter, SaleCard, ExtendedCard} from '../index';

const CardList = () => {
    return (
        <div>
            <ChooseFilter />
            <li>
                <SaleCard />
                <SaleCard />
                <SaleCard />
            </li>
            <Plaginator/>
        </div>
    );
};

export default CardList;