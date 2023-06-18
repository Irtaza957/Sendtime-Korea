import React from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';

import { QrAPI, QrQueryKeys } from '@api/etc/Qr';
import { ROUTES } from '@constants/routes';
import { FORMAT } from '@utils/time';

import {
  HostName,
  QrButton,
  QrContainer,
  QrCreatedAt,
  QrUrl,
} from './index.styles';

const QrList = () => {
  const router = useRouter();
  const { data } = useQuery(QrQueryKeys.get(), QrAPI.get);

  return (
    <QrContainer>
      {(data ?? []).map((d, idx) => (
        <QrButton
          key={idx}
          onClick={() =>
            router.push({
              pathname: `${ROUTES.SECRET.QR}/${idx}`,
              query: {
                hostName: d.hostName,
                url: d.url,
              },
            })
          }
        >
          <HostName>{d.hostName}</HostName>
          <QrUrl>{d.reservationPageName}</QrUrl>
          <QrCreatedAt>
            {dayjs(d.createdDateTime).format(FORMAT.koYMDHm)}
          </QrCreatedAt>
        </QrButton>
      ))}
    </QrContainer>
  );
};

export default QrList;
