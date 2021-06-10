import React from 'react';
import { Plaginator, ChooseFilter, SaleCard, ExtendedCard} from '../../index';
import style from "./CardList.module.scss";

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