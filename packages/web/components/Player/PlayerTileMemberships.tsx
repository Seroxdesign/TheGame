import { MetaTag, Text, VStack, Wrap, WrapItem } from '@metafam/ds';
import { GuildMembership } from 'graphql/getMemberships';
import React from 'react';

type Props = {
  memberships: Array<GuildMembership>;
};

const SHOW_MEMBERSHIPS = 4;

export const PlayerTileMemberships: React.FC<Props> = ({ memberships }) =>
  memberships.length === 0 ? null : (
    <VStack spacing={2} align="stretch" mt={2}>
      <Text textStyle="caption">Guilds</Text>
      <Wrap>
        {memberships.slice(0, SHOW_MEMBERSHIPS).map((member, i: number) => (
          <WrapItem key={member.memberId || i}>
            <MetaTag size="md" fontWeight="normal">
              {member.title}
            </MetaTag>
          </WrapItem>
        ))}
        {memberships.length > SHOW_MEMBERSHIPS && (
          <WrapItem>
            <MetaTag size="md" fontWeight="normal">
              {`+${memberships.length - SHOW_MEMBERSHIPS}`}
            </MetaTag>
          </WrapItem>
        )}
      </Wrap>
    </VStack>
  );
