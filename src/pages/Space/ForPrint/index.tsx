import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import i18n from 'locales';
import { useQuery } from 'react-query';

import { SpaceAPI, SpaceData } from '@api/space/SpaceApi';
import SpaceProfileCardForPrint from '@components/Space/SpaceProfileCard/ForPrint';
import useLoading from '@hooks/useLoading';
import { SpaceProfileCategoryUtil } from '@utils/spaceUtils';

import * as Styled from './index.styles';

interface SpacePageForPrintProps {
  spaceInfo: SpaceData;
}

const SpacePageForPrint = ({ spaceInfo }: SpacePageForPrintProps) => {
  const router = useRouter();
  const {
    columns: columnsQuery,
    rows: rowsQuery,
    reverse: reverseQuery,
    paperWidth: paperWidthQuery,
    paperHeight: paperHeightQuery,
  } = router.query;

  const columns =
    columnsQuery === undefined ? 2 : parseInt(columnsQuery as string);
  const rows = rowsQuery === undefined ? 1 : parseInt(rowsQuery as string);
  const reverse = reverseQuery === 'true';
  const paperWidth =
    paperWidthQuery === undefined ? 297 : parseInt(paperWidthQuery as string);
  const paperHeight =
    paperHeightQuery === undefined ? 210 : parseInt(paperHeightQuery as string);

  const { loadingView } = useLoading();

  const { isLoading, data: spaceProfilesListData = [] } = useQuery(
    ['spaceProfiles', spaceInfo.handle],
    async () => {
      const { data } = await SpaceAPI.getSpaceProfiles(spaceInfo.handle);
      return data.results[0].spaceProfileList;
    }
  );

  const spaceProfiles = useMemo(() => {
    const profiles = [...spaceProfilesListData];

    return profiles.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [spaceProfilesListData]);

  return (
    <>
      {isLoading && loadingView()}
      <Styled.A4s
        columns={columns}
        reverse={reverse}
        paperWidth={paperWidth}
        paperHeight={paperHeight}
      >
        {spaceProfiles.reverse().map((profile) => (
          <Styled.CardWrapper
            key={profile.id}
            rows={rows}
            reverse={reverse}
            paperWidth={paperWidth}
            paperHeight={paperHeight}
          >
            <SpaceProfileCardForPrint
              {...profile}
              subTitle={
                profile.categoryId && spaceInfo.profileCategoryConfig
                  ? SpaceProfileCategoryUtil.getLocalizedCategoryName(
                      spaceInfo.profileCategoryConfig,
                      profile.categoryId,
                      i18n.language
                    )
                  : undefined
              }
              color={
                profile.categoryId && spaceInfo.profileCategoryConfig
                  ? SpaceProfileCategoryUtil.getCategoryColor(
                      spaceInfo.profileCategoryConfig,
                      profile.categoryId
                    )
                  : undefined
              }
            />
          </Styled.CardWrapper>
        ))}
      </Styled.A4s>
    </>
  );
};

export default SpacePageForPrint;
