# -*- coding: utf-8 -*-

import argparse
from . import compiler


def main():
    parser = argparse.ArgumentParser(description='CodeKit Language Compiler.')
    parser.add_argument('src', nargs=1, metavar='SOURCE')
    parser.add_argument('dest', nargs=1, metavar='DEST')
    parser.add_argument('--framework-paths', '-f', action='append',
                        metavar='DIR')
    namespace = parser.parse_args()
    compiler_ = compiler.Compiler(framework_paths=namespace.framework_paths)
    compiler_.generate_to_file(namespace.dest[0], namespace.src[0])
