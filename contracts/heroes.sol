// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Heroes is ERC721A, Ownable {

    string private baseURI = "https://gateway.pinata.cloud/ipfs/QmP4B7rmtnGFYZ4YVFTWLFK89TaEVsPXRx4Ns3eazSrDzd/";

    constructor() ERC721A("heroes", "HEROES") {}

    function mint(uint256 quantity) external payable onlyOwner() {
        require(quantity < 6, "You can mint a maximum of 5 NFTs");
        _mint(msg.sender, quantity);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function returnPrompt() external pure returns(bytes memory) {
        return "a game charector profile image. heroic armored hero without a helmet";
    }
}
