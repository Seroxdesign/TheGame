import { Box, Flex, IconButton } from '@metafam/ds';
import { GuildAnnouncements } from 'components/Guild/Section/GuildAnnouncements';
import { GuildHero } from 'components/Guild/Section/GuildHero';
import { GuildLinks } from 'components/Guild/Section/GuildLinks';
import { GuildPlayers } from 'components/Guild/Section/GuildPlayers';
import { CustomTextSection } from 'components/Section/CustomTextSection';
import { EmbeddedUrl } from 'components/Section/EmbeddedUrlSection';
import { GuildFragment } from 'graphql/autogen/types';
import React, { forwardRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { BoxMetadata, BoxType, BoxTypes, createBoxKey } from 'utils/boxTypes';

type Props = {
  type: BoxType;
  guild?: GuildFragment;
  metadata?: BoxMetadata;
  editing?: boolean;
  onRemoveBox?: (boxKey: string) => void;
};

const GuildSectionInner: React.FC<Props & { guild: GuildFragment }> = ({
  metadata,
  type,
  guild,
  editing = false,
}) => {
  switch (type) {
    case BoxTypes.GUILD_HERO:
      return <GuildHero {...{ guild, editing }} />;
    case BoxTypes.GUILD_PLAYERS:
      return <GuildPlayers {...{ guild, editing }} />;
    case BoxTypes.GUILD_LINKS:
      return <GuildLinks {...{ guild, editing }} />;
    case BoxTypes.GUILD_ANNOUNCEMENTS:
      return <GuildAnnouncements {...{ guild, editing }} />;
    case BoxTypes.EMBEDDED_URL: {
      const { url } = metadata ?? {};
      return url ? <EmbeddedUrl {...{ url, editing }} /> : null;
    }
    case BoxTypes.CUSTOM_TEXT: {
      const { title, content } = metadata ?? {};
      return title && content ? (
        <CustomTextSection {...{ title, content }} />
      ) : null;
    }
    default:
      return null;
  }
};

export const GuildSection = forwardRef<HTMLDivElement, Props>(
  ({ metadata, type, guild, editing = false, onRemoveBox }, ref) => {
    const key = createBoxKey(type, metadata);

    if (!guild) return null;

    return (
      <Flex
        w="100%"
        {...{ ref }}
        direction="column"
        h="auto"
        minH="100%"
        boxShadow="md"
        pos="relative"
      >
        <Box pointerEvents={editing ? 'none' : 'initial'}>
          <GuildSectionInner
            {...{
              metadata,
              type,
              guild,
              editing,
            }}
          />
        </Box>
        {editing && (
          <Flex
            className="gridItemOverlay"
            w="100%"
            h="100%"
            bg="purpleTag50"
            pos="absolute"
            top={0}
            left={0}
          />
        )}
        {editing && type && type !== BoxTypes.GUILD_HERO && (
          <IconButton
            aria-label="Remove Profile Section"
            size="lg"
            pos="absolute"
            top={0}
            right={0}
            bg="transparent"
            color="pinkShadeOne"
            icon={<FaTimes />}
            _hover={{ color: 'white' }}
            onClick={() => onRemoveBox?.(key)}
            onTouchStart={() => onRemoveBox?.(key)}
            _focus={{
              boxShadow: 'none',
              backgroundColor: 'transparent',
            }}
            _active={{
              transform: 'scale(0.8)',
              backgroundColor: 'transparent',
            }}
            isRound
          />
        )}
      </Flex>
    );
  },
);
