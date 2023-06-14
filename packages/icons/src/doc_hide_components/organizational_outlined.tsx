/**
 * APITable <https://github.com/apitable/apitable>
 * Copyright (C) 2022 APITable Ltd. <https://apitable.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable max-len */
import React from 'react';
import { makeIcon, IIconProps } from '../utils/icon';

export const OrganizationalOutlined: React.FC<IIconProps> = makeIcon({
  Path: ({ colors }) => <>
    <path d="M5.75 3.5C5.75 2.25736 6.75736 1.25 8 1.25C9.24264 1.25 10.25 2.25736 10.25 3.5C10.25 4.47966 9.62389 5.31309 8.75 5.62197V6.75H13C13.4142 6.75 13.75 7.08579 13.75 7.5V9.55575C14.752 9.78312 15.5 10.6792 15.5 11.75C15.5 12.9926 14.4926 14 13.25 14C12.0074 14 11 12.9926 11 11.75C11 10.8666 11.5091 10.1021 12.25 9.73388V8.25H8.75V9.62803C9.62389 9.93691 10.25 10.7703 10.25 11.75C10.25 12.9926 9.24264 14 8 14C6.75736 14 5.75 12.9926 5.75 11.75C5.75 10.7703 6.37611 9.93691 7.25 9.62803V8.25H3.75V9.73388C4.49086 10.1021 5 10.8666 5 11.75C5 12.9926 3.99264 14 2.75 14C1.50736 14 0.5 12.9926 0.5 11.75C0.5 10.6792 1.24801 9.78312 2.25 9.55575V7.5C2.25 7.08579 2.58579 6.75 3 6.75H7.25V5.62197C6.37611 5.31309 5.75 4.47966 5.75 3.5ZM8 2.75C7.58579 2.75 7.25 3.08579 7.25 3.5C7.25 3.91421 7.58579 4.25 8 4.25C8.41421 4.25 8.75 3.91421 8.75 3.5C8.75 3.08579 8.41421 2.75 8 2.75ZM2.75 11C2.33579 11 2 11.3358 2 11.75C2 12.1642 2.33579 12.5 2.75 12.5C3.16421 12.5 3.5 12.1642 3.5 11.75C3.5 11.3358 3.16421 11 2.75 11ZM7.25 11.75C7.25 11.3358 7.58579 11 8 11C8.41421 11 8.75 11.3358 8.75 11.75C8.75 12.1642 8.41421 12.5 8 12.5C7.58579 12.5 7.25 12.1642 7.25 11.75ZM13.25 11C12.8358 11 12.5 11.3358 12.5 11.75C12.5 12.1642 12.8358 12.5 13.25 12.5C13.6642 12.5 14 12.1642 14 11.75C14 11.3358 13.6642 11 13.25 11Z" fill={ colors[0] } fillRule="evenodd" clipRule="evenodd"/>

  </>,
  name: 'organizational_outlined',
  defaultColors: ['#D9D9D9'],
  colorful: false,
  allPathData: ['M5.75 3.5C5.75 2.25736 6.75736 1.25 8 1.25C9.24264 1.25 10.25 2.25736 10.25 3.5C10.25 4.47966 9.62389 5.31309 8.75 5.62197V6.75H13C13.4142 6.75 13.75 7.08579 13.75 7.5V9.55575C14.752 9.78312 15.5 10.6792 15.5 11.75C15.5 12.9926 14.4926 14 13.25 14C12.0074 14 11 12.9926 11 11.75C11 10.8666 11.5091 10.1021 12.25 9.73388V8.25H8.75V9.62803C9.62389 9.93691 10.25 10.7703 10.25 11.75C10.25 12.9926 9.24264 14 8 14C6.75736 14 5.75 12.9926 5.75 11.75C5.75 10.7703 6.37611 9.93691 7.25 9.62803V8.25H3.75V9.73388C4.49086 10.1021 5 10.8666 5 11.75C5 12.9926 3.99264 14 2.75 14C1.50736 14 0.5 12.9926 0.5 11.75C0.5 10.6792 1.24801 9.78312 2.25 9.55575V7.5C2.25 7.08579 2.58579 6.75 3 6.75H7.25V5.62197C6.37611 5.31309 5.75 4.47966 5.75 3.5ZM8 2.75C7.58579 2.75 7.25 3.08579 7.25 3.5C7.25 3.91421 7.58579 4.25 8 4.25C8.41421 4.25 8.75 3.91421 8.75 3.5C8.75 3.08579 8.41421 2.75 8 2.75ZM2.75 11C2.33579 11 2 11.3358 2 11.75C2 12.1642 2.33579 12.5 2.75 12.5C3.16421 12.5 3.5 12.1642 3.5 11.75C3.5 11.3358 3.16421 11 2.75 11ZM7.25 11.75C7.25 11.3358 7.58579 11 8 11C8.41421 11 8.75 11.3358 8.75 11.75C8.75 12.1642 8.41421 12.5 8 12.5C7.58579 12.5 7.25 12.1642 7.25 11.75ZM13.25 11C12.8358 11 12.5 11.3358 12.5 11.75C12.5 12.1642 12.8358 12.5 13.25 12.5C13.6642 12.5 14 12.1642 14 11.75C14 11.3358 13.6642 11 13.25 11Z'],
  width: '16',
  height: '16',
  viewBox: '0 0 16 16',
});
