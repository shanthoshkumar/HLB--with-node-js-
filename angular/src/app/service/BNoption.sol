pragma solidity ^0.4.23;
library SafeMath 
{
    function add(uint a, uint b) internal pure returns (uint) 
    {
        uint c;
        c = a + b;
        require(c >= a,"c >= a");
        return c;
    }
    
    function sub(uint a, uint b) internal pure returns (uint) 
    {
        require(b <= a, "b <= a");
        uint c;
        c = a - b;
        return c;
    }
    
    function mul(uint a, uint b) internal pure returns (uint) 
    {
        uint c;
        c = a * b;
        require(a == 0 || c / a == b,"a == 0 || c / a == b");
        return c;
    }
    
    function div(uint a, uint b) internal pure returns (uint) 
    {
        require(b > 0,"b > 0");
        uint c;
        c = a / b;
        return c;
    }
    
}
/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
    address public owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    /**
     * @dev The Ownable constructor sets the original `owner` of the contract to the sender
     * account.
     */
    constructor() public{
        owner = msg.sender;
    }
    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner,"Only owner");
        _;
    }
    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner) public onlyOwner{
        require(newOwner != address(0), "New owner should be a valid address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}
contract Accounts{
    using SafeMath for uint;
    mapping(address => uint256) balances;
    event Withdrawn(address beneficiary,uint256 amount);
    /**
    * @dev Deposit amount to their balance.
    * @return true
    */
    function deposit() public payable returns(bool){
        require(msg.value > 0, "Value should be > 0");
        balances[msg.sender] = balances[msg.sender].add(msg.value);
        return true;
    }
    
    /**
    * @dev Allow to withdraw amount from their balance.
    * @param _amount The amount to withdraw
    * @return true
    */
    function withdraw(uint256 _amount) public payable returns(bool){
        require(balances[msg.sender] >= _amount, "Not enough balance");
        
        msg.sender.transfer(_amount);
        balances[msg.sender] = balances[msg.sender].sub(_amount);
        
        emit Withdrawn(msg.sender,_amount);
        return true;
    }
    /**
    * @dev Gets the balance of the specified address.
    * @return An uint256 representing the amount owned by the passed address.
    */
    function balanceOf() public view returns (uint256 accountbalance) {
        return balances[msg.sender];
    }    
}
contract BinaryOption is Ownable, Accounts
{
    using SafeMath for uint;
    //uint256 public decimals = 18;
    uint256 optionID;
    struct option{
        uint256[] times;
        uint256 minbet;
        uint256 maxbet;
        uint result; //0 not set, 1 low, 2 draw, 3 high
        //uint finalized;
        uint256[] totals;
        uint256[] counts;
    }
    mapping(uint256 => option) _options;
    uint256[] _optionList;
    
    struct bet{
        uint256 amount;
        uint256 optionID;
        uint selectedOption; // 1 = low, 3= high
        uint claimed;
    }
    
    mapping(uint256 => mapping(address => bet)) _bets;
    
    event OptionFinalized(uint256 optionID);
    event OptionCreated(uint256 optionID);
    event ResultPublished(uint256 optionID,uint result);
    constructor() public
    {
        //createOption(now.add(100),now.add(1000000),1,200000);
    }
    function currentTime() public view returns(uint256){
        return now;
    }
    /**
    * @dev Option creation.
    * @param _minbet The minimum bet amount in wei.
    * @param _maxbet The maximum bet amount in ether.
    * @return An uint256 representing the amount owned by the passed address.
    */
    function createOption(uint256 _starttime, uint256 _endtime, uint256 _minbet, uint256 _maxbet) 
    public onlyOwner payable returns(uint256){
        require(_starttime > now, "Start should be > now");
        require(_endtime > _starttime, "End should be > Start");
        require(_minbet > 0, "Min bet should be > 0");
        require(_maxbet > 0, "Max bet should be > 0");
        optionID = optionID.add(1);
        _options[optionID].times = [_starttime,_endtime];
        _options[optionID].minbet = _minbet;
        _options[optionID].maxbet = _maxbet;//.mul(1 ether);
        _options[optionID].result = 0;
        //_options[optionID].finalized = 0;
        _options[optionID].totals = [0,0];
        _options[optionID].counts = [0,0];
        _optionList.push(optionID);
        
        emit OptionCreated(optionID);
        return optionID;
    }
    function optionDetails(uint256 id) public view 
        returns(uint256[] times,uint256 minbet,uint256 maxbet,uint256 result, 
        uint256[] totals,uint256[] counts)
    {
        return (
            _options[id].times,
            _options[id].minbet,
            _options[id].maxbet,
            _options[id].result,
            //_options[id].finalized,
            _options[id].totals,
            _options[id].counts
            );
    }
    function betDetails(uint256 _oID) public view 
        returns(uint256 amount,uint selectedvalue, uint claimed)
    {
        return(
            _bets[_oID][msg.sender].amount,
            _bets[_oID][msg.sender].selectedOption,
            _bets[_oID][msg.sender].claimed
        );
    }
    function optionList() public view returns(uint256[]){
        return _optionList;
    }
    function betting(uint256 _oID,uint _optionSelected,uint256 amount) public payable returns(bool){
        require(_options[_oID].times[0] < now, "Option not started");
        require(_options[_oID].times[1] > now, "Option ended");
        require(_options[_oID].result == 0, "Result published");
        //require(_options[_oID].finalized == 0, "Option finalized");
        require(_oID > 0, "Optionid should be > 0");
        require(_optionSelected == 1 || _optionSelected == 3, "Selected Option should be 1 or 3");
        //require(_optionSelected < 4, "Selected Option should be 1 or 3");
        require(amount > 0, "Value should be > 0");
        require(_bets[_oID][msg.sender].amount == 0, "Betting already done");
        require(_options[_oID].minbet <= amount, "Minbet should be >= value");
        require(_options[_oID].maxbet >= amount, "Maxbet should be <= value");
        
        _bets[_oID][msg.sender].amount = amount;
        _bets[_oID][msg.sender].optionID = _oID;
        _bets[_oID][msg.sender].selectedOption = _optionSelected;
        _bets[_oID][msg.sender].claimed = 0;
        if(_optionSelected == 1){
            _options[_oID].totals[0] = _options[_oID].totals[0].add(amount);
            _options[_oID].counts[0] = _options[_oID].counts[0].add(1);
        }else if(_optionSelected==3){
            _options[_oID].totals[1] = _options[_oID].totals[1].add(amount);
            _options[_oID].counts[1] = _options[_oID].counts[1].add(1);
        }
        balances[msg.sender] = balances[msg.sender].sub(amount);
        return true;
    }
    
    function setResult(uint256 _oID,uint _result) public onlyOwner payable returns(bool)
    {
        require(_options[_oID].times[1] < now, "Option not ended");
        require(_options[_oID].result == 0, "Result published");
        //require(_options[_oID].finalized == 0, "Option finalized");
        
        _options[_oID].result = _result;
        
        /*
        for(uint i = 0;i < _options[_oID].betters.length;i++){
            _claim(_oID,_options[_oID].betters[i]);
        }
        */
        emit ResultPublished(_oID,_result);
        return true;
    }
    function _claim(uint256 _oID, address better) internal returns(bool){
        require(_bets[_oID][msg.sender].claimed == 0, "Already claimed");
        require(_options[_oID].result > 0, "Result not published");
        //require(_options[_oID].finalized > 0, "Option not finalized");
        require(better != address(0), "Must be a valid address");
        uint result = _options[_oID].result;
        uint value1Total = _options[_oID].totals[0];
        uint value2Total = _options[_oID].totals[1];
        uint256 bettedAmount = _bets[_oID][better].amount;
        uint bettedOption = _bets[_oID][better].selectedOption;
        uint256 balanceToUpdate = 0;
        if(result == 2){
            //draw. full refund
            balanceToUpdate = bettedAmount; 
        }
        else
        {
            if(bettedOption == 1 && result == 1){
                balanceToUpdate = bettedAmount.div(value1Total).mul(value2Total).add(bettedAmount);
            }
            else if(bettedOption == 3 && result == 3){
                balanceToUpdate = bettedAmount.div(value2Total).mul(value1Total).add(bettedAmount);
            }
        }
        if(balanceToUpdate > 0)
            balances[better] = balances[better].add(balanceToUpdate);
        _bets[_oID][msg.sender].claimed = 1;
        return true;
    }
    function claim(uint256 _oID) public payable returns(bool){
        return _claim(_oID,msg.sender);
    }
}