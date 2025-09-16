import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Collapse,
    IconButton,
    Container,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './CollapsibleCard.css'

interface ICollapsibleCardProps {
    title: string;
    answer: string;
    defaultOpen?: boolean;
}

const CollapsibleCard: React.FC<ICollapsibleCardProps> = ({ title, answer, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <Card className="card">
            <CardHeader
                className="card-header"
                title={<span className="card-title">{title}</span>}
                action={
                    <IconButton
                        onClick={() => setOpen(!open)}
                        aria-label="expand"
                        size="small"
                        style={{ color: 'white' }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                }
            />
            <Collapse in={open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                <CardContent className="card-content">
                    <Container disableGutters className="container">
                        {answer}
                    </Container>
                </CardContent>
            </Collapse>
        </Card>

    );
};

export default CollapsibleCard;
