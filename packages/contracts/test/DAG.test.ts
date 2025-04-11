import { expect } from 'chai';
import { ethers } from 'hardhat';
import { ContainerDAG } from '../src';
import { DAGStructure } from './dag-library';
import { check } from './test-helpers';
import { deployDagContainer } from './utils';

describe('DAGContainer Contract', function () {
  let dagOnchain: ContainerDAG;

  beforeEach(async () => {
    const [deploySigner] = await ethers.getSigners();
    dagOnchain = await deployDagContainer(deploySigner);
  });

  describe('success', () => {
    it('when adding nodes', async () => {
      await dagOnchain.addNode(1);
      await dagOnchain.addNode(2);

      const nodeAExists = await dagOnchain.nodeExists(1);
      const nodeBExists = await dagOnchain.nodeExists(2);
      const nodes = await dagOnchain.getAllNodes();

      expect([...nodes]).to.deep.equal([1n, 2n]);
      check(nodeBExists, true);
      check(nodeAExists, true);
    });

    it('when adding edges between nodes', async () => {
      await dagOnchain.addNode(1);
      await dagOnchain.addNode(2);

      const childrenOfNode1Pre = await dagOnchain.getChildren(1);

      await dagOnchain.addEdge(1, 2);

      const childrenOfNode1Post = await dagOnchain.getChildren(1);
      const parentsOfNode2 = await dagOnchain.getParents(2);

      expect(childrenOfNode1Pre).to.have.lengthOf(0);
      expect(childrenOfNode1Post).to.include(2n);
      expect(parentsOfNode2).to.include(1n);
    });

    it('when setting parents and children nodes', async () => {
      await dagOnchain.addNode(1);
      await dagOnchain.addNode(2);
      await dagOnchain.addNode(3);

      await dagOnchain.addEdge(1, 2);
      await dagOnchain.addEdge(2, 3);

      const hasChildrenNode1 = await dagOnchain.hasChildren(1);
      const hasParentsNode2 = await dagOnchain.hasParents(2);

      check(hasParentsNode2, true);
      check(hasChildrenNode1, true);
    });

    it('when detecting cycles in the graph', async () => {
      await dagOnchain.addNode(1);
      await dagOnchain.addNode(2);
      await dagOnchain.addNode(3);
      await dagOnchain.addNode(4);
      await dagOnchain.addNode(55);

      await dagOnchain.addEdge(1, 2); // 1 -> 2
      await dagOnchain.addEdge(1, 3); // 1 -> 3
      await dagOnchain.addEdge(2, 4); // 2 -> 4
      await dagOnchain.addEdge(3, 4); // 3 -> 4
      await dagOnchain.addEdge(3, 55); // 3 -> 55
      await dagOnchain.addEdge(55, 1); // 55 -> 1 // This will create a cycle

      const cycleExists = await dagOnchain.hasCycle.staticCall();
      check(cycleExists, true);
    });

    it('when performing topological sort', async () => {
      await dagOnchain.addNode(1);
      await dagOnchain.addNode(2);
      await dagOnchain.addNode(3);
      await dagOnchain.addNode(4);
      await dagOnchain.addNode(55);

      await dagOnchain.addEdge(1, 2); // 1 -> 2
      await dagOnchain.addEdge(1, 3); // 1 -> 3
      await dagOnchain.addEdge(2, 4); // 2 -> 4
      await dagOnchain.addEdge(3, 4); // 3 -> 4
      await dagOnchain.addEdge(3, 55); // 3 -> 55

      const result = await dagOnchain.topologicalSort.staticCall();
      const sortedOnchain = [...result];

      const dagOffchain = new DAGStructure<bigint>();
      dagOffchain.addNodes(1n, 2n, 3n, 4n, 55n);
      dagOffchain.addEdge(1n, 2n);
      dagOffchain.addEdge(1n, 3n);
      dagOffchain.addEdge(2n, 4n);
      dagOffchain.addEdge(3n, 4n);
      dagOffchain.addEdge(3n, 55n);
      const sortedOffchain = dagOffchain.topologicalSort();

      expect(sortedOnchain).to.deep.equal(sortedOffchain); // [ 1n, 3n, 55n, 2n, 4n ]
    });
  });

  describe('failure', () => {
    it('when node does not exists', async () => {
      const incorrectNodeId = 7;

      await dagOnchain.addNode(3);
      await dagOnchain.addNode(5);

      const nodeExists = await dagOnchain.nodeExists(incorrectNodeId);
      check(nodeExists, false);

      const addEdgeTx = dagOnchain.addEdge(3, incorrectNodeId);
      await expect(addEdgeTx).to.be.revertedWith('DAGV-003');

      const hasChildrenTx = dagOnchain.hasChildren(incorrectNodeId);
      await expect(hasChildrenTx).to.be.revertedWith('DAGV-003');

      const hasParentsTx = dagOnchain.hasParents(incorrectNodeId);
      await expect(hasParentsTx).to.be.revertedWith('DAGV-003');
    });

    it('when node duplicates', async () => {
      await dagOnchain.addNode(3);
      await dagOnchain.addNode(5);
      const tx = dagOnchain.addNode(5);

      await expect(tx).to.be.revertedWith('DAGV-004');
    });

    it('when edge is incorrect', async () => {
      await dagOnchain.addNode(3);
      await dagOnchain.addNode(5);
      await dagOnchain.addNode(7);

      await dagOnchain.addEdge(3, 5);
      await dagOnchain.addEdge(5, 7);

      const addDuplicatedEdgeTx = dagOnchain.addEdge(3, 5);
      await expect(addDuplicatedEdgeTx).to.be.revertedWith('DAGV-001');

      const addCyclicEdgeTx = dagOnchain.addEdge(5, 5);
      await expect(addCyclicEdgeTx).to.be.revertedWith('DAGV-002');
    });

    it('when dag has disconnected node clusters', async () => {
      const root = 1n;
      await dagOnchain.addNode(root);
      await dagOnchain.addNode(2n);
      await dagOnchain.addNode(3n);
      await dagOnchain.addNode(4n);
      await dagOnchain.addNode(55n);

      await dagOnchain.addEdge(root, 3n);
      await dagOnchain.addEdge(2n, 3n);
      await dagOnchain.addEdge(55n, 4n);

      const dagOffchain = new DAGStructure<bigint>();
      dagOffchain.addNodes(1n, 2n, 3n, 4n, 55n);
      dagOffchain.addEdge(root, 3n);
      dagOffchain.addEdge(2n, 3n);
      dagOffchain.addEdge(55n, 4n);

      const onchainResult =
        await dagOnchain.hasDisconnectedCluster.staticCall(root);
      const offchainResult = dagOffchain.hasDisconnectedCluster(root);

      check(onchainResult, offchainResult);
    });
  });
});
