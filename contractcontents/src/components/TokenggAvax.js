import { formatEther } from "@ethersproject/units";
import { useCall} from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Contract Address
import contractAddresses from "../data/contractAddresses.json"
// ABI
import TokenggAvaxABI from "../abi/contract/tokens/TokenggAVAX.sol/TokenggAVAX.json"

function useGGAVAXStats(func) {
    const TokenggAvaxInterface = new utils.Interface(
      TokenggAvaxABI.abi
    );
    const { value, error } =
      useCall(
        func && {
            contract: new Contract(contractAddresses["TokenggAVAX"], TokenggAvaxInterface), // instance of called contract
            method: func, // Method to be called
            args: [], // Method arguments - address to be checked for balance
          }
      ) ?? {};
    if(error) {
      console.error(error.message)
      return undefined
    }
    return value?.[0]
}

function createData( stat, value ) {
    return { stat, value };
}

function TokenggAvax() {
    const rewardsCycleLength = useGGAVAXStats("rewardsCycleLength");
    const lastSync = useGGAVAXStats("lastSync");
    const rewardsCycleEnd = useGGAVAXStats("rewardsCycleEnd");
    const lastRewardAmount = useGGAVAXStats("lastRewardAmount");
    const totalReleasedAssets = useGGAVAXStats("totalReleasedAssets");
    const stakingTotalAssets = useGGAVAXStats("stakingTotalAssets");

    const rows = [
        createData('Rewards Cycle Length', rewardsCycleLength),
        createData('Last Sync', lastSync),
        createData('Reward Cycle End', rewardsCycleEnd),
        createData('Last Reward Amt', lastRewardAmount),
        createData('Total Released Assets', totalReleasedAssets),
        createData('Staking Total Assets', stakingTotalAssets)
    ];

    console.log(rows);

  return (
    <>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Stat</TableCell>
                <TableCell align="right">Value</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.stat}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.stat}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>


    // <div>
    //   <h3>ggAVAX:</h3>
    //   <table>
    //     <tr>
    //       {totalFloat && (<><td>Total Float: </td><td>{formatEther(totalFloat)}</td></>)}
    //     </tr>
    //     <tr>
    //       {totalAssets && (<><td>Total Assets: </td><td>{formatEther(totalAssets)}</td></>)}
    //     </tr>
    //     <tr>
    //       {amountAvailableForStaking && (<><td>Available for Staking: </td><td>{formatEther(amountAvailableForStaking)}</td></>)}
    //     </tr>
    //     <tr>
    //       {stakingTotalAssets && (<><td>Staking Total Assets: </td><td>{formatEther(stakingTotalAssets)}</td></>)}
    //     </tr>
    //     <tr>
    //       {totalReleasedAssets && (<><td>Total Released Assets: </td><td>{formatEther(totalReleasedAssets)}</td></>)}
    //     </tr>
    //     <tr>
    //       {lastRewardAmount && (<><td>Last Reward Amount: </td><td>{formatEther(lastRewardAmount)}</td></>)}
    //     </tr>
    //     <tr>
    //       {rewardsCycleEnd && (<><td>Rewards Cycle End </td><td>{rewardsCycleEnd}</td></>)}
    //     </tr>
    //     <tr>
    //       {rewardsCycleLength && (<><td>Rewards Cycle Length: </td><td>{rewardsCycleLength}</td></>)}
    //     </tr>
    //     <tr>
    //       {lastSync && (<><td>Last Sync: </td><td>{lastSync}</td></>)}
    //     </tr>
    //   </table>
    // </div>
  );
}

export default TokenggAvax;