import { FC, ReactNode, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { Box, useTheme } from '@mui/material';

interface ScrollbarProps {
  className?: string;
  children?: ReactNode;
  autoScrollBottom?: boolean;
  ref?: any;
}

const Scrollbar: FC<ScrollbarProps> = ({
  className,
  children,
  autoScrollBottom = true,
  ref,
  ...rest
}) => {
  const theme = useTheme();
  const scrollbarRef = useRef(null);

  useEffect(() => {
    if (autoScrollBottom) scrollbarRef.current.scrollToBottom();
  });

  return (
    <Scrollbars
      autoHide
      universal
      ref={scrollbarRef}
      renderThumbVertical={() => {
        return (
          <Box
            sx={{
              width: 5,
              background: `${theme.colors.alpha.black[10]}`,
              borderRadius: `${theme.general.borderRadiusLg}`,
              transition: `${theme.transitions.create(['background'])}`,

              '&:hover': {
                background: `${theme.colors.alpha.black[30]}`
              }
            }}
          />
        );
      }}
      {...rest}
    >
      {children}
    </Scrollbars>
  );
};

Scrollbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Scrollbar;
