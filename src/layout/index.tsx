import { Checkbox, CheckboxGroup, Divider, Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { options, sideBar } from '../constant/options';
import { Header } from '../components';
import { Radio, RadioChangeEvent, Space } from 'antd';
import { filters } from '../constant/filters';
import { useContext } from 'react';
import { APP_CONTEXT } from '../App';
import manageAPI from '../axios/manageAPI';
const Layout = () => {
  const current = useLocation();
  const context = useContext(APP_CONTEXT);
  console.log('Layout', context.address);
  const handleChangeRadio = (e: RadioChangeEvent) => {
    console.log('handleChangeRadio', e.target.value);
    if (context && context.setAddress) {
      const clear = async () => {
        try {
          await manageAPI.clear();
        } catch (err) {
          console.log(err);
        }
      };
      clear();
      context.setAddress(e.target.value);
    }
  };
  return (
    <Grid
      templateAreas={`"header header"
                  "sidebar main"`}
      gridTemplateRows={'60px 1fr'}
      gridTemplateColumns={'250px 1fr'}
      h="100vh"
      gap="1"
      className="bg-white text-zinc-800"
    >
      <GridItem area={'sidebar'} className="border-r border-zinc-600">
        <div>
          <ul className="px-1">
            {sideBar.map((option) => {
              const Icon = option.icon;
              return (
                <li key={option.id}>
                  <NavLink
                    to={option.url}
                    className={({ isActive }) =>
                      isActive
                        ? 'active text-blue-600 flex gap-1 items-center texl-2xl px-4 py-2 mb-2 border-l-4 font-semibold border-red-500 bg-sky-100'
                        : 'flex gap-1 items-center texl-2xl px-4 py-2 mb-2 hover:border-l-4 font-semibold hover:border-red-500 hover:bg-sky-100'
                    }
                  >
                    <Icon fontSize={20} fontWeight={600} />
                    <span>{option.label}</span>
                  </NavLink>
                  {option.label === 'Camera' && option.url === current.pathname && (
                    <div className="ml-8 animate-slideOut">
                      <Text fontSize="xl" className="font-semibold" textAlign="left">
                        Select location
                      </Text>
                      <Radio.Group onChange={handleChangeRadio} value={context.address} className="text-left">
                        <Space direction="vertical">
                          {options.map((option) => {
                            return (
                              <Radio value={option.value} key={option.id}>
                                {option.label}
                              </Radio>
                            );
                          })}
                        </Space>
                      </Radio.Group>

                      <Divider />
                      <CheckboxGroup>
                        {filters.map((filter) => {
                          return (
                            <Stack key={filter.id} className="px-1 py-2">
                              <Checkbox colorScheme="red" value={filter.value}>
                                {filter.label}
                              </Checkbox>
                            </Stack>
                          );
                        })}
                      </CheckboxGroup>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </GridItem>
      <GridItem area={'header'}>
        <Header />
      </GridItem>
      <GridItem className="bg-zinc-200 overflow-hidden" area={'main'}>
        {/* main */}
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Layout;
