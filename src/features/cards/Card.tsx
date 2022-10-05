import React from 'react';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {deleteCardsTC, updateCardsTC} from './cards-reducer';
import styles from './Card.module.css'
import {BasicRating} from "../../common/components/starsRating/StartRating";
import SuperButton from "../../common/components/superButton/SuperButton";
import { SvgSelector } from '../../common/components/svgSelector/svgSelector';

export type CardType = {
    question: string
    answer: string
    grade: number
    updated: string
    userID: string
    cardID: string
}

export const Card = (props: CardType) => {

    const dispatch = useAppDispatch()

    const userID = useAppSelector((state)=>state.auth.profile?._id)
    const isPackAuthor = props.userID === userID

    const onEditClickHandler = () => {
        const card = {
            _id: props.cardID,
            question: 'update q',
            comments: 'updetnul exy',
        }
           dispatch(updateCardsTC(card))
    }

    const onDeleteClickHandler = () => {
        dispatch(deleteCardsTC(props.cardID))
    }

    return (
        <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell align="left">{props.question}</TableCell>
            <TableCell align="left">{props.answer}</TableCell>
            <TableCell align="left">{props.updated.replace(/^(\d+)\-(\d+)\-(\d+)\D.+$/, '$3.$2.$1')}</TableCell>
            <TableCell align="left"><BasicRating values={props.grade}/></TableCell>
            <TableCell align="right">
                {isPackAuthor &&
                    <SuperButton className={styles.iconBtn} onClick={onEditClickHandler}>
                        <SvgSelector svgName='pencil'/>
                    </SuperButton> }
                {isPackAuthor &&
                    <SuperButton className={styles.iconBtn}><SvgSelector svgName='delete'/></SuperButton>}
            </TableCell>
        </TableRow>
    );
};

